/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Loader, Select, SelectProps } from "@mantine/core";
import React, { forwardRef, useMemo, useState } from "react";
import { DataItem } from "../model";
import { processData } from "../utils";
type AsyncSelectProps = {
  dataSource?: {
    valueKey?: string;
    labelKey?: string | string[];
    url?: string;
    method?: string;
    mapData?: (data: any) => DataItem[] | undefined;
  };
} & SelectProps;

const AsyncSelect = forwardRef<HTMLInputElement, AsyncSelectProps>(
  (props, ref) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataItem[]>((props.data as any) ?? []);
    const { dataSource, ...other } = props;
    const url = dataSource?.url ?? "";
    const memoData = useMemo(() => data, [data]);
    return (
      <Select
        {...other}
        data={memoData}
        ref={ref}
        placeholder={loading ? "Loading..." : other.placeholder}
        searchable
        disabled={loading}
        rightSection={loading ? <Loader size="1rem" /> : null}
        comboboxProps={{
          onOpen: async () => {
            if (data.length === 0 && !loading) {
              setLoading(true);
              try {
                const response = await fetch(url, {
                  method: dataSource?.method,
                });
                const result = await response.json();
                if (dataSource?.mapData) {
                  setData(dataSource?.mapData(result) ?? []);
                } else {
                  if (Array.isArray(result)) {
                    const resData = processData({
                      data: result,
                      valueKey: dataSource?.valueKey,
                      labelKey: dataSource?.labelKey,
                      placeholder: [],
                    });
                    setData(resData);
                  }
                }
              } catch (error) {
                console.error("Failed to fetch data:", error);
              } finally {
                setLoading(false);
              }
            }
          },
        }}
      />
    );
  },
);
AsyncSelect.displayName = "AsyncSelect";
export default AsyncSelect;
