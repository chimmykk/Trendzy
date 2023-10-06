

export default function SellerInfo({ seller }: { seller: any }) {
  return (
    <div>
      <strong>Category:</strong> {seller?.category || 'N/A'}<br />
      <strong>Subcategory:</strong> {seller?.subcategory || 'N/A'}<br />
      <strong>Address Line 1:</strong> {seller?.returnAddress?.addressLine1 || 'N/A'}<br />
      <strong>Address Line 2:</strong> {seller?.returnAddress?.addressLine2 || 'N/A'}<br />
      <strong>State:</strong> {seller?.returnAddress?.state || 'N/A'}<br />
      <strong>City:</strong> {seller?.returnAddress?.city || 'N/A'}<br />
      <strong>Country:</strong> {seller?.returnAddress?.country || 'N/A'}<br />
      <strong>Identity Verification:</strong> {seller?.identityInfo?.identityVerification || 'N/A'}<br />
      <strong>Identity Verification ID:</strong> {seller?.identityInfo?.identityVerificationId || 'N/A'}<br />
    </div>
  );
}

