export default function Sent() {
  return (
    <main className="py-10 flex flex-col gap-4 max-w-prose mx-auto">
      <h1 className="text-2xl font-bold">Confirm your email address</h1>
      <p>
        Thanks for registering for Live Davening! To make sure you control the
        email you provided, our system just sent you an email.
      </p>
      <p className="font-semibold">
        Check your email inbox for a message from Live Davening. We sent a
        button you can click to confirm your Live Davenings account.
      </p>
      <p>
        Please check now, as the button expires in 10 minutes and after that
        will no longer work; you’ll have to go through the registration process
        again.
      </p>
      <p>Once you’ve confirmed your account, you can safely close this page.</p>
      <p>Didn’t get the email? Check your spam folder.</p>
    </main>
  );
}
