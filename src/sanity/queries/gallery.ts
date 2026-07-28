import { defineQuery } from "next-sanity";

const galleryImageProjection = `
  {
    "assetId": asset->_id,
    "url": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "aspectRatio": asset->metadata.dimensions.aspectRatio,
    "blurDataUrl": asset->metadata.lqip,
    alt,
    caption
  }
`;

export const galleryProjectsQuery = defineQuery(`
  *[
    _type == "galleryProject" &&
    defined(slug.current) &&
    defined(coverImage.asset)
  ]
  | order(
      displayOrder asc,
      publishedAt desc
    )
  {
    "id": _id,
    title,
    "slug": slug.current,
    serviceCategory,
    "vehicle": select(
      defined(vehicle.year) ||
      defined(vehicle.make) ||
      defined(vehicle.model) =>
        vehicle {
          year,
          make,
          model
        },
      null
    ),
    summary,
    "repairDetails": coalesce(repairDetails, []),
    completionDate,
    "coverImage": coverImage ${galleryImageProjection},
    "beforeImages":
      coalesce(
        beforeImages[] ${galleryImageProjection},
        []
      ),
    "afterImages":
      coalesce(
        afterImages[] ${galleryImageProjection},
        []
      ),
    "featured": coalesce(featured, false),
    "displayOrder": coalesce(displayOrder, 100),
    "publishedAt": coalesce(publishedAt, _createdAt),
    seoTitle,
    seoDescription
  }
`);

export const featuredGalleryProjectsQuery = defineQuery(`
    *[
      _type == "galleryProject" &&
      featured == true &&
      defined(slug.current) &&
      defined(coverImage.asset)
    ]
    | order(
        displayOrder asc,
        publishedAt desc
      )[0...6]
    {
      "id": _id,
      title,
      "slug": slug.current,
      serviceCategory,
      vehicle {
        year,
        make,
        model
      },
      summary,
      "repairDetails": coalesce(repairDetails, []),
      completionDate,
      "coverImage": coverImage ${galleryImageProjection},
      "beforeImages":
        coalesce(
          beforeImages[] ${galleryImageProjection},
          []
        ),
      "afterImages":
        coalesce(
          afterImages[] ${galleryImageProjection},
          []
        ),
      "featured": coalesce(featured, false),
      "displayOrder": coalesce(displayOrder, 100),
      "publishedAt": coalesce(publishedAt, _createdAt),
      seoTitle,
      seoDescription
    }
  `);

export const galleryProjectBySlugQuery = defineQuery(`
    *[
      _type == "galleryProject" &&
      slug.current == $slug &&
      defined(coverImage.asset)
    ][0]
    {
      "id": _id,
      title,
      "slug": slug.current,
      serviceCategory,
      vehicle {
        year,
        make,
        model
      },
      summary,
      "repairDetails": coalesce(repairDetails, []),
      completionDate,
      "coverImage": coverImage ${galleryImageProjection},
      "beforeImages":
        coalesce(
          beforeImages[] ${galleryImageProjection},
          []
        ),
      "afterImages":
        coalesce(
          afterImages[] ${galleryImageProjection},
          []
        ),
      "featured": coalesce(featured, false),
      "displayOrder": coalesce(displayOrder, 100),
      "publishedAt": coalesce(publishedAt, _createdAt),
      seoTitle,
      seoDescription
    }
  `);
