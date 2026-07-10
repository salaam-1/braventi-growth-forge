import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/techworks")({
  component: () => <Outlet />,
});
