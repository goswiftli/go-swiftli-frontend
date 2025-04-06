import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

import { formatNumberWithSuffix } from '@/utils';

export type DataProps = {
  title: string;
  valueKey: string | undefined;
  color?: string;
  computeValue?: (data: Record<string, string>) => any;
};

type PayloadData = {
  name: string;
  dataKey: string;
  color: string;
  payload: Record<string, string>;
};

interface CustomTooltipProps {
  payload?: Array<PayloadData>;
  active?: boolean;
  isFormatNumber?: boolean;
  data: DataProps[];
  topContent: DataProps;
}

export const ChartTooltip = ({
  active = false,
  payload,
  data = [],
  isFormatNumber = false,
  topContent,
}: CustomTooltipProps) => {
  if (active && payload?.length) {
    const payloadData = payload[0]?.payload;
    return (
      <Box
        p={3}
        bgColor="grey.100"
        border="1px solid"
        borderColor="#F3F4F6"
        borderRadius="4px"
        boxShadow="0px 4px 15px -3px #00000029"
      >
        <Text textStyle="h2" fontSize="xs" color="black.800">
          {topContent.title}: <Text as="span">{payloadData[`${topContent.valueKey}`]}</Text>
        </Text>
        {data.map((content, index) => {
          const value = content.computeValue
            ? content.computeValue(payloadData)
            : payloadData[content.valueKey as string];
          return (
            <HStack key={`${content.title}-${index}`}>
              <Icon boxSize="12px" color={content.color} as={RiCheckboxBlankCircleFill} />
              <Text fontFamily="body" fontSize="xs" color="black.600">
                {content.title}:{' '}
                <Text as="span" color="black.400" fontWeight="semibold">
                  {isFormatNumber ? formatNumberWithSuffix(Number(value)) : value}
                </Text>
              </Text>
            </HStack>
          );
        })}
      </Box>
    );
  }
};
