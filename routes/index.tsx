import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { RouteConfig } from "$fresh/server.ts";

export const config : RouteConfig = {skipInheritedLayouts: true};
export default function Home() {
  const count = useSignal(3);
  return (
    <div>
    </div>
  );
}
