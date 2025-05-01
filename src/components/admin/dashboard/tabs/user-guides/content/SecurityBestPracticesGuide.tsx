
export const SecurityBestPracticesGuide = () => {
  return (
    <div className="space-y-6">
      <h2 id="security-practices" className="text-2xl font-bold">Security Best Practices</h2>
      <p className="text-base">This guide outlines essential security practices for maintaining a secure marketplace environment.</p>
      
      <h3 id="admin-account-security" className="text-xl font-semibold mt-6">1. Admin Account Security</h3>
      <p className="text-base">Protect administrative access with these measures:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Implement strong password policies (minimum 12 characters, combination of letters, numbers, symbols)</li>
        <li>Enable two-factor authentication for all admin accounts</li>
        <li>Regularly audit admin account access and permissions</li>
        <li>Immediately revoke access for departing team members</li>
      </ul>
      
      <h3 id="data-protection" className="text-xl font-semibold mt-6">2. Data Protection</h3>
      <p className="text-base">Safeguard sensitive marketplace data:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Ensure all customer data is encrypted both in transit and at rest</li>
        <li>Implement proper data classification and handling procedures</li>
        <li>Regularly backup critical system data</li>
        <li>Establish a data retention policy compliant with relevant regulations</li>
      </ul>
      
      <h3 id="access-control" className="text-xl font-semibold mt-6">3. Access Control Management</h3>
      <p className="text-base">Implement robust access controls:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Apply the principle of least privilege for all user roles</li>
        <li>Regularly review and update role-based access controls</li>
        <li>Implement session timeout for inactive admin sessions</li>
        <li>Use IP restrictions for administrative access where appropriate</li>
        <li>Maintain detailed logs of all access and administrative actions</li>
      </ul>
      
      <h3 id="fraud-prevention" className="text-xl font-semibold mt-6">4. Fraud Prevention</h3>
      <p className="text-base">Protect the marketplace from fraudulent activities:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Implement transaction monitoring for suspicious patterns</li>
        <li>Verify high-value transactions with additional security measures</li>
        <li>Use machine learning algorithms to detect unusual behavior</li>
        <li>Establish clear procedures for investigating suspected fraud</li>
        <li>Regularly update fraud detection rules based on emerging threats</li>
      </ul>
      
      <h3 id="security-monitoring" className="text-xl font-semibold mt-6">5. Security Monitoring</h3>
      <p className="text-base">Maintain vigilant oversight of platform security:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Implement 24/7 monitoring of critical systems and infrastructure</li>
        <li>Set up alerts for suspicious activities or system anomalies</li>
        <li>Conduct regular security audits and vulnerability assessments</li>
        <li>Perform penetration testing at least quarterly</li>
        <li>Review security logs regularly for signs of compromise</li>
      </ul>
      
      <h3 id="incident-response" className="text-xl font-semibold mt-6">6. Incident Response</h3>
      <p className="text-base">Be prepared to respond to security incidents:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Develop and maintain a comprehensive incident response plan</li>
        <li>Establish clear roles and responsibilities for incident handling</li>
        <li>Conduct regular simulations and tabletop exercises</li>
        <li>Document all security incidents and response actions</li>
        <li>Review and update response procedures after each incident</li>
      </ul>
      
      <h3 id="compliance-management" className="text-xl font-semibold mt-6">7. Compliance Management</h3>
      <p className="text-base">Ensure adherence to relevant regulations:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Stay current with applicable data protection regulations</li>
        <li>Implement required compliance controls and documentation</li>
        <li>Conduct regular compliance assessments</li>
        <li>Maintain records of compliance activities</li>
        <li>Train staff on compliance requirements and procedures</li>
      </ul>
      
      <h3 id="security-awareness" className="text-xl font-semibold mt-6">8. Security Awareness</h3>
      <p className="text-base">Promote security consciousness throughout the organization:</p>
      <ul className="list-disc ml-6 mt-2 space-y-2">
        <li>Provide regular security awareness training for all staff</li>
        <li>Conduct simulated phishing exercises to test awareness</li>
        <li>Share security updates and alerts with the team</li>
        <li>Encourage reporting of suspicious activities</li>
        <li>Recognize and reward security-conscious behavior</li>
      </ul>
      
      <h3 id="version-information-security" className="text-xl font-semibold mt-6">9. Version Information</h3>
      <p className="text-base">This guide applies to GrandDuka Security Framework v3.1.2</p>
      <p className="text-base">Last updated: April 2025</p>
    </div>
  );
};
