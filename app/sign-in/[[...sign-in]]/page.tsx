import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <SignIn />
    </div>
  );
}
