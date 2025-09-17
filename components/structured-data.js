export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NextStore',
    description:
      'Premium e-commerce experience with amazing products at unbeatable prices',
    url: 'https://nextstore.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://nextstore.com/products?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NextStore',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nextstore.com/logo.png',
      },
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NextStore',
    url: 'https://nextstore.com',
    logo: 'https://nextstore.com/logo.png',
    description:
      'Premium e-commerce platform offering electronics, fashion, and home goods',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://facebook.com/nextstore',
      'https://twitter.com/nextstore',
      'https://instagram.com/nextstore',
    ],
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nextstore.com',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
