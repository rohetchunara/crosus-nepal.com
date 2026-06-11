import emailjs from '@emailjs/browser';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  lineTotal: number;
}

interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
}

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');

/**
 * Sends an order notification email to the business owner via EmailJS
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a free account at https://www.emailjs.com/
 * 2. Add an Email Service (Gmail) in your EmailJS dashboard
 * 3. Create an Email Template with these variables:
 *    - {{customer_name}}
 *    - {{customer_email}}
 *    - {{customer_phone}}
 *    - {{delivery_address}}
 *    - {{order_items}} (will contain formatted list)
 *    - {{total_amount}}
 *    - {{order_date}}
 * 4. Copy the Service ID, Template ID, and Public Key to your .env file
 */
export async function sendOrderEmail(orderData: OrderEmailData): Promise<boolean> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Check if EmailJS is configured
  if (!serviceId || !templateId || !publicKey ||
      serviceId === 'YOUR_SERVICE_ID' ||
      templateId === 'YOUR_TEMPLATE_ID' ||
      publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS not configured. Skipping email send. Update your .env file with valid credentials.');
    return false;
  }

  // Format order items as a clean text list
  const itemsList = orderData.items
    .map((item, index) => {
      const colorInfo = item.selectedColor ? ` (${item.selectedColor})` : '';
      return `${index + 1}. ${item.name}${colorInfo}
   Quantity: ${item.quantity}
   Unit Price: NPR ${item.price.toLocaleString()}
   Line Total: NPR ${item.lineTotal.toLocaleString()}`;
    })
    .join('\n\n');

  const templateParams = {
    customer_name: orderData.customerName,
    customer_email: orderData.customerEmail,
    customer_phone: orderData.customerPhone,
    delivery_address: orderData.deliveryAddress,
    order_items: itemsList,
    total_amount: `NPR ${orderData.totalAmount.toLocaleString()}`,
    order_date: orderData.orderDate,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log('Order email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send order email:', error);
    return false;
  }
}

/**
 * Formats order data from cart items and form data for email
 */
export function formatOrderData(
  formData: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  },
  cartItems: Array<{
    product: {
      name: string;
      price: number;
    };
    quantity: number;
    selectedColor?: {
      name: string;
    } | null;
  }>,
  totalPrice: number
): OrderEmailData {
  const items: OrderItem[] = cartItems.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    selectedColor: item.selectedColor?.name,
    lineTotal: item.product.price * item.quantity,
  }));

  const orderDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return {
    customerName: formData.fullName,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    deliveryAddress: formData.address,
    items,
    totalAmount: totalPrice,
    orderDate,
  };
}
