import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { useCreateOrgMutation } from "../hooks/mutation/useCreateOrgMutation";

interface CreateOrgDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateOrgDialog = ({
  isOpen,
  setIsOpen,
}: CreateOrgDialogProps) => {
  const { mutate, isPending } = useCreateOrgMutation();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    mutate(name, {
      onSuccess: () => {
        setName("");
        setSlug("");
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>

          <DialogDescription>
            Create a new workspace to organize your apps, members, and settings.
          </DialogDescription>
        </DialogHeader>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>

              <Input
                id="name"
                autoComplete="off"
                placeholder="My Workspace"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="slug">Slug</FieldLabel>

              <Input
                id="slug"
                autoComplete="off"
                placeholder="my-slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || !name.trim()}
          >
            {isPending ? "Creating..." : "Create Workspace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
