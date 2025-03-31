import { cn } from "@/components/tiptap/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { icons } from "lucide-react";
import { forwardRef } from "react";

import { Surface } from "./Surface";
import { Toolbar } from "./Toolbar";

export const Trigger = Popover.Trigger;
export const Portal = Popover.Portal;

export type MenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
};

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <Toolbar.Button
            className={triggerClassName}
            tooltip={!isOpen ? tooltip : ""}
          >
            {trigger}
          </Toolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal>
          <Popover.Content asChild sideOffset={8}>
            <Surface className="z-[9999] flex max-h-80 min-w-60 flex-col gap-0.5 overflow-auto p-2">
              {children}
            </Surface>
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content asChild sideOffset={8}>
          <Surface className="z-[9999] flex max-h-80 min-w-60 flex-col gap-0.5 overflow-auto p-2">
            {children}
          </Surface>
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

Menu.displayName = "Menu";

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
}) => {
  const className = cn(
    "flex items-center gap-2 p-1.5 text-sm font-medium text-gray-500 text-left bg-transparent w-full rounded",
    !isActive && !disabled,
    "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-200",
    isActive &&
      !disabled &&
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    disabled && "text-gray-400 cursor-not-allowed dark:text-gray-600"
  );

  const IconComponent = icon ? icons[icon] : null;
  const IconCustomComponent = iconComponent || null;

  const ItemComponent = close ? Popover.Close : "button";

  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className="size-4" />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  );
};

export type CategoryTitle = {
  children: React.ReactNode;
};

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return (
    <div className="mb-1.5 mt-4 select-none px-1 text-[0.625rem] font-medium uppercase text-gray-400 first:mt-1.5 dark:text-gray-600">
      {children}
    </div>
  );
};

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return (
    <hr
      {...props}
      ref={ref}
      className="my-1 border-gray-200 dark:border-gray-800"
    />
  );
});

Divider.displayName = "Divider";
