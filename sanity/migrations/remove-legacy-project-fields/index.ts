import { at, defineMigration, unset } from "sanity/migrate";

export default defineMigration({
  title: "Remove legacy project gallery and description fields",
  documentTypes: ["project"],
  filter: "defined(gallery) || defined(description)",
  migrate: {
    document() {
      return [at("gallery", unset()), at("description", unset())];
    },
  },
});
