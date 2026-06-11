import { ArrowLeft } from "lucide-react";

type LegalType = "privacy" | "terms" | "returns";

interface LegalPageProps {
  type: LegalType;
  onBack: () => void;
}

const legalContent: Record<LegalType, { title: string; subtitle: string; sections: { heading: string; content: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we handle and protect your information",
    sections: [
      {
        heading: "Data Collection",
        content: `At Crosus Nepal, we collect only the information necessary to fulfill your orders and improve your experience. This includes:

• Contact Information: Name, email address, phone number, and shipping address when you place an order.
• Payment Data: Payment details are processed securely through our payment partners. We do not store your complete card information.
• Communication Records: Any messages you send us through our contact form or email correspondence.
• Device Information: Basic browser and device data collected through cookies to improve site functionality.

We believe in minimal data collection — only what's essential to craft and deliver your handmade pieces to you.`
      },
      {
        heading: "Usage",
        content: `Your information is used exclusively for:

• Order Fulfillment: Processing, crafting, and shipping your handmade items.
• Customer Service: Responding to your inquiries and providing order updates.
• Site Improvement: Analyzing anonymous usage patterns to enhance your shopping experience.
• Legal Compliance: Meeting any regulatory requirements applicable to our business in Nepal.

We never sell, rent, or share your personal data with third parties for marketing purposes. Your trust is fundamental to our craft.`
      },
      {
        heading: "Security",
        content: `We implement industry-standard security measures to protect your data:

• Encrypted Transmissions: All data between your browser and our servers is encrypted using SSL/TLS.
• Secure Payments: Payment processing is handled by certified payment providers with PCI DSS compliance.
• Limited Access: Access to customer data is restricted to team members who need it for order fulfillment.
• Regular Reviews: We periodically review our security practices to address emerging threats.

While no online system is completely secure, we are committed to protecting the information you share with us. If you have concerns about data security, please contact us directly.`
      }
    ]
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Agreement for handmade goods and services",
    sections: [
      {
        heading: "Handmade Policy",
        content: `Every Crosus piece is crafted by hand in our Kathmandu studio. Please understand:

• Unique Variations: Due to the handmade nature of our products, slight variations in size, color, and texture are to be expected — these are marks of authenticity, not defects.
• Made-to-Order: Most items are created after you place your order. This means your piece has never sat on a shelf; it was made specifically for you.
• Craft Timeline: Each item requires 3-5 days of dedicated handwork. We don't rush craft. This timeline is integral to maintaining quality.
• Natural Materials: We use natural fibers and materials that may have inherent variations in shade and texture.

By ordering from Crosus Nepal, you acknowledge and celebrate these characteristics of handmade artisanal goods.`
      },
      {
        heading: "Payment",
        content: `Our payment terms are designed to be fair and transparent:

• Order Process:
• Payment is collected at the time of order placement to secure your handmade piece.
• All prices are displayed in Nepali Rupees (NPR) and include applicable taxes.
• We accept major credit cards, digital wallets, and bank transfers through our secure payment partners.

Price & Availability:
• Prices are subject to change without notice, but confirmed orders will honor the price at the time of purchase.
• In the rare event an item becomes unavailable, we will contact you to offer alternatives or a full refund.

Order Confirmation:
• You will receive an order confirmation email within 24 hours of placing your order.
• Your order is considered confirmed once payment has been successfully processed.`
      },
      {
        heading: "Shipping",
        content: `We ship our handcrafted pieces with care and intention:

Domestic Shipping (Nepal):
• Free standard shipping on all orders within Nepal.
• Delivery within 5-7 business days after the 3-5 day crafting period.
• Express shipping available for an additional fee.

International Shipping:
• Available to select countries. Shipping costs and delivery times vary by destination.
• International orders may be subject to customs duties and import taxes — these are the responsibility of the recipient.
• Please allow 2-3 weeks for international delivery.

Tracking:
• All orders receive a tracking number via email once shipped.
• You can track your package through the carrier's website or our customer service team.`
      }
    ]
  },
  returns: {
    title: "Returns & Refunds",
    subtitle: "Our promise of quality and care",
    sections: [
      {
        heading: "Damaged Items",
        content: `If your Crosus piece arrives damaged, we will make it right:

What to Do:
• Contact us within 48 hours of delivery with photos of the damaged item and packaging.
• Include your order number and a brief description of the damage.
• Do not attempt to repair or alter the damaged item.

Our Commitment:
• We will offer a replacement piece crafted with the same care and attention.
• If a replacement isn't possible, we will provide a full refund including shipping costs.
• For replacement pieces, we will cover all shipping fees.

We take quality seriously — each piece is thoroughly inspected before it leaves our studio. However, shipping can be unpredictable, and we're here to resolve any issues quickly.`
      },
      {
        heading: "Return Window",
        content: `Due to the made-to-order, handmade nature of our products:

General Returns:
• We accept returns within 7 days of delivery for unworn, unused items in original condition.
• Returns must be initiated through our customer service team via email.
• Return shipping costs are the responsibility of the customer unless the return is due to our error.

Non-Returnable Items:
• Custom or personalized orders cannot be returned unless they arrive damaged.
• Items that show signs of wear, use, or alteration.
• Final sale items, if applicable, are clearly marked.

Refund Process:
• Once we receive and inspect your return, refunds are processed within 5-7 business days.
• Refunds are issued to the original payment method.
• You will receive an email confirmation once your refund is processed.

We believe in standing behind our craft. If you have any concerns about your order, please reach out — we're here to help.`
      }
    ]
  }
};

export default function LegalPage({ type, onBack }: LegalPageProps) {
  const content = legalContent[type];

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-light text-[#2C2520]/60 hover:text-[#2C2520] mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        {/* Page Header */}
        <header className="mb-12">
          <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-3">
            Legal
          </p>
          <h1 className="text-[#2C2520] font-extralight text-4xl md:text-5xl tracking-tight mb-4">
            {content.title}
          </h1>
          <p className="text-[#2C2520]/50 font-light text-base max-w-xl">
            {content.subtitle}
          </p>
          <div className="mt-8 h-px w-16 bg-[#A97C65]/60" />
        </header>

        {/* Last Updated */}
        <p className="text-[#2C2520]/35 text-xs tracking-widest uppercase font-light mb-12">
          Last updated: June 2024
        </p>

        {/* Content Sections */}
        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <section key={index} className="border-b border-[#2C2520]/10 pb-10 last:border-0">
              <h2 className="text-[#2C2520] font-light text-xl md:text-2xl tracking-wide mb-4">
                {section.heading}
              </h2>
              <div className="text-[#2C2520]/60 font-light text-sm leading-[1.9] whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 pt-10 border-t border-[#2C2520]/10">
          <p className="text-[#A97C65] text-[11px] tracking-[0.4em] uppercase font-light mb-3">
            Questions?
          </p>
          <p className="text-[#2C2520]/60 font-light text-sm leading-relaxed mb-4">
            If you have any questions about our policies or your order, please reach out to us at:
          </p>
          <a
            href="crosusnepal@gmail.com"
            className="text-[#A97C65] font-light text-sm hover:text-[#8f6652] transition-colors tracking-wide"
          >
            crosusnepal@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
