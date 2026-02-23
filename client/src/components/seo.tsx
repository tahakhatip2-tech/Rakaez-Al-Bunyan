import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
}

const SITE_NAME = "ركائز البنيان للمقاولات العامة";
const BASE_URL = "https://rakaez-eta.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;
const DEFAULT_DESCRIPTION = "شركة ركائز البنيان للمقاولات العامة — متخصصون في الإنشاءات السكنية والتجارية، الدهانات، السباكة، الكهرباء، والديكورات الداخلية بأعلى معايير الجودة.";

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = "مقاولات, إنشاءات, دهانات, سباكة, كهرباء, ديكور, ركائز البنيان",
    image = DEFAULT_IMAGE,
    url = BASE_URL,
    type = "website",
}: SEOProps) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    return (
        <Helmet>
            {/* Primary */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="ar_SA" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
