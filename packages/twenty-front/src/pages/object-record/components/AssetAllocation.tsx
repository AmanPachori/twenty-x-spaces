import { Table } from '@/ui/layout/table/components/Table';
import { TableBody } from '@/ui/layout/table/components/TableBody';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, CardContent } from 'twenty-ui/layout';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.font.family};
  gap: ${({ theme }) => theme.spacing(4)};
  margin: 0 auto;
  width: 90% !important;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  font-family: ${({ theme }) => theme.font.family};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.font.color.primary};
    box-shadow: ${({ theme }) => theme.boxShadow.strong};
    transform: scale(1.02);
  }
`;

const StyledCardContent = styled(CardContent)`
  font-family: ${({ theme }) => theme.font.family};
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledHeading = styled.h2`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const StyledSubHeading = styled.h3`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
`;

const StyledMetricValue = styled.p`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 32px;
  font-weight: bold;
  margin: ${({ theme }) => theme.spacing(2)} 0;
`;

const StyledMetricDescription = styled.p`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin: ${({ theme }) => theme.spacing(1)} 0;
  line-height: 1.5;
`;

const StyledAllocationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledAllocationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  font-family: ${({ theme }) => theme.font.family};
  height: ${({ theme }) => theme.spacing(6)};

  &:last-child {
    border-bottom: none;
  }
`;

const StyledTableCell = styled(TableCell)`
  border-right: 1px solid ${({ theme }) => theme.border.color.light};
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  height: ${({ theme }) => theme.spacing(6)};

  &:last-child {
    border-right: none;
  }
`;

// Updated mock data for asset allocation
const assetAllocation = [
  {
    class: 'Equity',
    value: 400000,
    percentage: 40,
    risk: 'High',
    return: '12.5%',
    lastYear: '+15.2%',
    allocation: 'Overweight',
    details: 'Large Cap: 25%, Mid Cap: 10%, Small Cap: 5%',
  },
  {
    class: 'Debt',
    value: 300000,
    percentage: 30,
    risk: 'Low',
    return: '8.2%',
    lastYear: '+6.8%',
    allocation: 'Neutral',
    details: 'Corporate Bonds: 15%, Government Bonds: 10%, T-Bills: 5%',
  },
  {
    class: 'Real Estate',
    value: 200000,
    percentage: 20,
    risk: 'Medium',
    return: '9.5%',
    lastYear: '+8.4%',
    allocation: 'Underweight',
    details: 'REITs: 12%, Direct Property: 8%',
  },
  {
    class: 'Cash',
    value: 100000,
    percentage: 10,
    risk: 'Very Low',
    return: '4.2%',
    lastYear: '+4.1%',
    allocation: 'Underweight',
    details: 'Money Market: 6%, Savings: 4%',
  },
];

export const AssetAllocation = () => {
  const theme = useTheme();
  const totalValue = 1000000; // Updated to $1,000,000
  const topHolding = assetAllocation.reduce((max, asset) =>
    asset.percentage > max.percentage ? asset : max,
  );
  const averageReturn =
    assetAllocation.reduce((sum, asset) => sum + parseFloat(asset.return), 0) /
    assetAllocation.length;

  return (
    <StyledContainer>
      <StyledCardsContainer>
        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>Total Portfolio Value</StyledSubHeading>
            <StyledMetricValue>
              ${totalValue.toLocaleString()}
            </StyledMetricValue>
            <StyledMetricDescription>
              You have {assetAllocation.length} asset classes
            </StyledMetricDescription>
            <StyledMetricDescription>
              Top holding: {topHolding.class}
            </StyledMetricDescription>
          </StyledCardContent>
        </StyledCard>

        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>Asset Allocation</StyledSubHeading>
            <StyledAllocationList>
              {assetAllocation.map((asset, index) => (
                <StyledAllocationItem key={index}>
                  <span>{asset.class}</span>
                  <span>{asset.percentage}%</span>
                </StyledAllocationItem>
              ))}
            </StyledAllocationList>
          </StyledCardContent>
        </StyledCard>

        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>Portfolio Metrics</StyledSubHeading>
            <StyledAllocationList>
              <StyledAllocationItem>
                <span>Average Return</span>
                <span>{averageReturn.toFixed(1)}%</span>
              </StyledAllocationItem>
              <StyledAllocationItem>
                <span>Risk Level</span>
                <span>Moderate</span>
              </StyledAllocationItem>
              <StyledAllocationItem>
                <span>Last Year</span>
                <span>+8.6%</span>
              </StyledAllocationItem>
              <StyledAllocationItem>
                <span>Rebalancing Due</span>
                <span>In 30 days</span>
              </StyledAllocationItem>
            </StyledAllocationList>
          </StyledCardContent>
        </StyledCard>
      </StyledCardsContainer>

      <StyledCard>
        <StyledCardContent>
          <StyledHeading>Detailed Allocation</StyledHeading>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Asset Class</StyledTableCell>
                <StyledTableCell>Value</StyledTableCell>
                <StyledTableCell>Percentage</StyledTableCell>
                <StyledTableCell>Risk Level</StyledTableCell>
                <StyledTableCell>Return</StyledTableCell>
                <StyledTableCell>Last Year</StyledTableCell>
                <StyledTableCell>Allocation</StyledTableCell>
              </StyledTableRow>
              {assetAllocation.map((asset, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{asset.class}</StyledTableCell>
                  <StyledTableCell>
                    ${asset.value.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell>{asset.percentage}%</StyledTableCell>
                  <StyledTableCell>{asset.risk}</StyledTableCell>
                  <StyledTableCell>{asset.return}</StyledTableCell>
                  <StyledTableCell>{asset.lastYear}</StyledTableCell>
                  <StyledTableCell>{asset.allocation}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledCardContent>
      </StyledCard>
    </StyledContainer>
  );
};
