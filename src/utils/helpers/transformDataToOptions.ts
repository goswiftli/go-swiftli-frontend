export const transformDataToOptions = <T>(
  data: T[] | undefined,
  labelTransform: (item: T) => string,
  valueTransform: (item: T) => string | number,
  extra?: (item: T) => Record<string, any>
): { label: string; value: string | number }[] => {
  return (
    data?.map((item) => ({
      label: labelTransform(item),
      value: valueTransform(item),
      ...(extra ? extra(item) : {}),
    })) || []
  );
};
