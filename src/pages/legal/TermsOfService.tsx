import React from "react";

const TermsOfService = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray dark:prose-invert">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using 404Skill ("the Service"), you agree to be bound by these Terms of Service
          and all applicable laws and regulations. If you do not agree with any of these terms, you are
          prohibited from using or accessing the Service.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily access the Service for personal, non-commercial purposes.
          This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h2>3. Subscription and Billing</h2>
        <p>
          By subscribing to our Service, you agree to pay the subscription fees as described in the pricing
          section. Subscriptions are billed in advance on a monthly or annual basis and are non-refundable
          except as described in our refund policy.
        </p>

        <h2>4. User Content</h2>
        <p>
          You retain all rights to any content you submit, post, or display on or through the Service.
          By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, and distribute your content in connection with providing the Service.
        </p>

        <h2>5. Disclaimer</h2>
        <p>
          The materials on the Service are provided on an 'as is' basis. 404Skill makes no warranties,
          expressed or implied, and hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
          or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>6. Limitations</h2>
        <p>
          In no event shall 404Skill or its suppliers be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business interruption) arising out
          of the use or inability to use the Service.
        </p>

        <h2>7. Revisions and Errata</h2>
        <p>
          The materials appearing on the Service could include technical, typographical, or photographic
          errors. 404Skill does not warrant that any of the materials on its website are accurate,
          complete, or current. We may make changes to the materials contained on the Service at any
          time without notice.
        </p>

        <h2>8. Links</h2>
        <p>
          404Skill has not reviewed all of the sites linked to its Service and is not responsible for
          the contents of any such linked site. The inclusion of any link does not imply endorsement
          by 404Skill of the site.
        </p>

        <h2>9. Modifications</h2>
        <p>
          404Skill may revise these terms of service at any time without notice. By using the Service,
          you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws and you
          irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService; 