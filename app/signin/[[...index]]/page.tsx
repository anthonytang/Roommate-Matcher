import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  );
}
