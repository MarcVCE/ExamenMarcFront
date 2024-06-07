import { FreshContext } from "$fresh/server.ts";
import LogoutButton from "../islands/LogoutButton.tsx";
import { StateLayout } from "../types.ts";

export default async function Layout(req: Request, ctx: FreshContext<StateLayout,unknown>){

  return (
    <div class="page-container">
      <header class="header-container">
      <div class="header-content">
        <span class="user-name">{ctx.state.name}</span>
        <LogoutButton></LogoutButton>
      </div>
      </header>
      <ctx.Component />
    </div>
  );
}