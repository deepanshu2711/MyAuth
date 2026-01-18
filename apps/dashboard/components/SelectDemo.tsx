"use client";

import { useState, useEffect } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

const technologies = [
  {
    id: "nextjs",
    name: "Next.js",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
  },
  // {
  //   id: "react",
  //   name: "React",
  //   avatar:
  //     "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  // },
  // {
  //   id: "express",
  //   name: "Express",
  //   avatar: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  // },
];

export default function Example() {
  const pathname = usePathname();
  const [selected, setSelected] = useState(technologies[0]);

  useEffect(() => {
    const lastSegment = pathname.split("/").pop();
    const matchingTech = technologies.find((tech) => tech.id === lastSegment);
    if (matchingTech) {
      setSelected(matchingTech);
    }
  }, [pathname]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-2 mb-5">
        <ListboxButton className="grid  w-full cursor-default grid-cols-1 rounded-md bg-neutral-800 text-white py-1.5 pr-2 pl-3 text-left  -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selected?.avatar}
              className="size-5 shrink-0 rounded-full bg-gray-100"
            />
            <span className="block truncate">{selected?.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10  max-h-56 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-white shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {technologies.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              className="group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={person.avatar}
                  className="size-5 shrink-0 bg-gray-100 p-1 rounded-full"
                />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {person.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
