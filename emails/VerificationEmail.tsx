import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Row,
  Heading,
  Text,
} from "@react-email/components";

export function VerificationEmail({ username, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily={"Verdana"}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username}, </Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering, Please use the following verification
            your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
      {/* <Button href={"/"}>Click me</Button> */}
    </Html>
  );
}

export default VerificationEmail;
