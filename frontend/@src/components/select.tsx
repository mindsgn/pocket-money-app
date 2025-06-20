"use client";

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/@src/components/ui/select"

interface Select {
  label: string;
  types: string[];
  onChange?: (value: string) => void;
}

export default function SelectDropDown({ label, types, onChange }: Select) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {
            types.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
