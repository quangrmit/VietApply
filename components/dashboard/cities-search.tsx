"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, removeAccents } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProfileData } from "@/lib/types";
import {City, CitiesSearchProps} from '../../lib/types'
import useCities from "@/hooks/useCities";


export default function CitiesSearch({ handleSelect, initialValue }: CitiesSearchProps) {
    const [open, setOpen] = useState(false);
    const {selectedCity, cityNames} = useCities();
  
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between border-zinc-500 flex"
                >
                    {selectedCity
                        ? cityNames.find((city) => city.normalizedName === selectedCity)?.name
                        : initialValue}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search city" className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {cityNames.map((city) => (
                                <CommandItem
                                    key={city.name}
                                    value={city.normalizedName}
                                    onSelect={(currentValue) => {
                                        handleSelect(
                                            "location",
                                            currentValue === selectedCity ? "" : currentValue
                                        );

                                        setOpen(false);
                                    }}
                                >
                                    {city.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedCity === city.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
