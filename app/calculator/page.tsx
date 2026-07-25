import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CalculatorWizard } from "@/components/calculator/CalculatorWizard";

export const metadata: Metadata = {
  title: "Գնի հաշվիչ",
  description:
    "Հաշվեք ձեր վերանորոգման մոտավոր արժեքը րոպեների ընթացքում՝ ծառայություն, մակերես և ավարտի մակարդակ ընտրելով։",
};

export default function CalculatorPage() {
  return (
    <Section>
      <SectionHeading
        center
        eyebrow="Անվճար հաշվիչ"
        title="Հաշվեք ձեր վերանորոգման արժեքը"
        subtitle="Մի քանի քայլով ստացեք մոտավոր գնահատում։ Ճշգրիտ գինը կհաստատվի անվճար այցից հետո։"
      />
      <CalculatorWizard />
    </Section>
  );
}
