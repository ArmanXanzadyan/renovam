import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CalculatorTeaser() {
  return (
    <section className="section">
      <Container>
        <div className="overflow-hidden rounded-card bg-brand px-6 py-12 text-center text-white md:px-12">
          <h2 className="text-white">Իմացեք ձեր վերանորոգման արժեքը հիմա</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">
            Օգտվեք անվճար օնլայն հաշվիչից և ստացեք մոտավոր գնահատում մի քանի քայլով։
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/calculator" variant="accent" size="lg">
              Բացել հաշվիչը
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
