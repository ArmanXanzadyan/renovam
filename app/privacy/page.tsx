import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Գաղտնիության քաղաքականություն",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-prose">
        <h1>Գաղտնիության քաղաքականություն</h1>
        <div className="prose-hy mt-6 space-y-4 text-ink">
          <p>
            {site.name}-ը հարգում է ձեր անձնական տվյալների գաղտնիությունը։ Սույն
            քաղաքականությունը նկարագրում է, թե ինչ տվյալներ ենք հավաքում և ինչպես
            ենք օգտագործում դրանք։
          </p>
          <h2 className="text-h3">Ի՞նչ տվյալներ ենք հավաքում</h2>
          <p>
            Հայտ ուղարկելիս մենք հավաքում ենք ձեր անունը, հեռախոսահամարը և ձեր
            տրամադրած լրացուցիչ տեղեկությունները (ծառայություն, մակերես,
            հաղորդագրություն)։
          </p>
          <h2 className="text-h3">Ինչպե՞ս ենք օգտագործում տվյալները</h2>
          <p>
            Տվյալներն օգտագործվում են բացառապես ձեր հայտին պատասխանելու և
            ծառայություններ մատուցելու նպատակով։ Մենք չենք վաճառում ձեր տվյալները
            երրորդ անձանց։
          </p>
          <h2 className="text-h3">Կապ</h2>
          <p>
            Հարցերի դեպքում կապվեք մեզ հետ՝ {site.phoneDisplay} կամ {site.email}։
          </p>
        </div>
      </div>
    </Section>
  );
}
