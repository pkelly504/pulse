"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@pulse/components/ui/command";
import { useState } from "react";
import ky from 'ky';

type User = {
  id: string,
  name: string,
  email: string
}

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selectedValue, setSelectedValue] = useState("");

  const onSearch = async (term: string) => {
    setSearchValue(term);
    setSelectedValue("");

    setResults(term ? await ky.get(`/api/users?search=${term}`).json<User[]>() : []);
  };

  const onSelect = (selected: string) => {
    setSearchValue(selected)
    setSelectedValue(selected);
  }

  console.log(results);

  return (
    <Command className="rounded-xl border shadow-md max-w-xl mx-auto">
      <CommandInput
        placeholder="Who are you looking for?"
        value={searchValue}
        onValueChange={onSearch}
        className="h-16 text-xl"
      />
      <CommandList>
        {searchValue && results.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}

        {!selectedValue && results.length > 0 && (
          <CommandGroup>
            {results.map((u) => (
              <CommandItem key={u.id} onSelect={onSelect}>
                <span>{u.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
