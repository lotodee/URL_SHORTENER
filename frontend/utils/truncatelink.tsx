
export const truncateLink = (link: string, maxLength: number) => {
    if (link.length <= maxLength) {
      return link;
    }
    return link.substring(0, maxLength) + '...';
  };
  