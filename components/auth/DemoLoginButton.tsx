"use client";

import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const DEMO_CREDENTIALS = {
  email: "demo@plantpal.app",
  password: "PlantPalDemo123",
};

export const DemoLoginButton = ({
  onFill,
}: {
  onFill: (creds: typeof DEMO_CREDENTIALS) => void;
}) => (
  <Button
    type="button"
    variant="outline"
    className="w-full"
    onClick={() => onFill(DEMO_CREDENTIALS)}
  >
    <Sprout size={16} />
    Fill demo login
  </Button>
);
