class CategoryMapper {
  toPersistence(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }

  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

const categoryMapper = new CategoryMapper();

export default categoryMapper;
