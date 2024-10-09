import { type PageInfo } from "@keybr/pages-shared";
import { type ReactNode, useEffect } from "react";
import { useIntl } from "react-intl";

export function Title({ page }: { readonly page: PageInfo }): ReactNode {
  const { formatMessage } = useIntl();
  const title = formatMessage(page.title);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}