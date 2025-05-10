import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. 14-Day Money-Back Guarantee</h2>
        <p>
          We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied
          with our service within the first 14 days of your subscription, we'll provide a full refund
          of your payment.
        </p>

        <h2>2. Refund Eligibility</h2>
        <p>
          To be eligible for a refund:
        </p>
        <ul>
          <li>Your refund request must be made within 14 days of your initial subscription</li>
          <li>You must not have used more than 2 code review credits</li>
          <li>You must not have scheduled or attended any mentorship calls</li>
        </ul>

        <h2>3. How to Request a Refund</h2>
        <p>
          To request a refund:
        </p>
        <ol>
          <li>Email us at support@404skill.com</li>
          <li>Include your account email and reason for the refund</li>
          <li>We'll process your request within 2 business days</li>
        </ol>

        <h2>4. Refund Processing</h2>
        <p>
          Once approved, refunds will be processed to your original payment method within 5-10
          business days. The exact timing depends on your payment provider.
        </p>

        <h2>5. Exceptions</h2>
        <p>
          We may make exceptions to this policy in cases of:
        </p>
        <ul>
          <li>Technical issues preventing access to the service</li>
          <li>Service unavailability for extended periods</li>
          <li>Other exceptional circumstances at our discretion</li>
        </ul>

        <h2>6. Annual Subscriptions</h2>
        <p>
          For annual subscriptions, the 14-day money-back guarantee applies to the full annual
          payment. After the 14-day period, annual subscriptions are non-refundable.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our refund policy, please contact us at:
          <br />
          Email: support@404skill.com
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy; 