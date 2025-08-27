import { Card } from "@/components/ui/card"

const paymentMethods = [
  {
    name: "TeleBirr",
    logo: "/telebirr-logo-ethiopian-mobile-payment.png",
    description: "Mobile payment solution",
  },
  {
    name: "CBE Birr",
    logo: "/cbe-birr-ethiopian-bank-payment.png",
    description: "Commercial Bank of Ethiopia",
  },
  {
    name: "Amole",
    logo: "/amole-ethiopian-mobile-money.png",
    description: "Mobile money service",
  },
  {
    name: "HelloCash",
    logo: "/hellocash-ethiopian-payment.png",
    description: "Digital payment platform",
  },
]

export function PaymentMethods() {
  return (
    <div className="space-y-4">
      <h3 className="font-space-grotesk font-semibold text-lg text-foreground">Accepted Payment Methods</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.name}
            className="neumorphic-card p-4 text-center hover:shadow-lg transition-all duration-200"
          >
            <img src={method.logo || "/placeholder.svg"} alt={method.name} className="h-10 w-auto mx-auto mb-2" />
            <p className="font-dm-sans text-sm font-medium text-foreground">{method.name}</p>
            <p className="font-dm-sans text-xs text-muted-foreground">{method.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
