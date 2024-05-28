import {
  Html,
  Tailwind,
  Section,
  Container,
  Heading,
  Text,
  Button,
  CodeInline,
} from "@react-email/components";

export function ConfirmRegistrationEmail(props: {
  displayName: string;
  emailAddress: string;
  confirmation: string;
}) {
  return (
    <Tailwind>
      <Html lang="en" className="bg-slate-400">
        <Section className="mx-10 my-20">
          <Container className="bg-slate-100 max-w-4xl rounded-xl">
            <Heading className="text-2xl font-bold mb-10">
              Live Davenings
            </Heading>
            <Heading as="h2" className="text-3xl mb-5">
              Confirm your account registration
            </Heading>
            <Text className="text-lg mb-5">
              Welcome to Live Davenings! You are receiving this email because
              you registered for a Live Davenings account with the email address{" "}
              <CodeInline className="bg-slate-200">
                {props.emailAddress}
              </CodeInline>{" "}
              and the display name{" "}
              <CodeInline className="bg-slate-200 text-black">
                {props.displayName}
              </CodeInline>
              . We just need you to click the button below to confirm that the
              email address you provided is yours.
            </Text>
            <Text className="text-lg mb-5">
              If you {"didn't"} just register, you can safely ignore this email.
            </Text>
            <Button
              href={props.confirmation}
              className="text-4xl bg-slate-500 text-white font-bold px-5 py-10 rounded-xl"
            >
              Click here to proceed.
            </Button>
          </Container>
        </Section>
      </Html>
    </Tailwind>
  );
}
