import { Table } from '@/ui/layout/table/components/Table';
import { TableBody } from '@/ui/layout/table/components/TableBody';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ResponsiveLine } from '@nivo/line';
import { Card, CardContent } from 'twenty-ui/layout';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.font.family};
  gap: ${({ theme }) => theme.spacing(4)};
  margin: 0 auto;
  max-width: 95% !important;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  flex: 1;
  font-family: ${({ theme }) => theme.font.family};
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.font.color.primary};
    box-shadow: ${({ theme }) => theme.boxShadow.strong};
    transform: scale(1.02);
  }
`;

const StyledCardContent = styled(CardContent)`
  font-family: ${({ theme }) => theme.font.family};
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledChartContainer = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  font-family: ${({ theme }) => theme.font.family};
  height: 300px;
  margin: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
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

const StyledMetricDescription = styled.p`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin: ${({ theme }) => theme.spacing(1)} 0 0 0;
`;

const StyledMetricValue = styled.p`
  color: ${({ theme }) => theme.font.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const StyledMetricsContainer = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.font.family};
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  width: 100%;
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

// Mock data for the line chart
const portfolioData = [
  {
    id: 'Portfolio Value',
    data: [
      { x: '2024-01', y: 1.1 },
      { x: '2024-02', y: 1.15 },
      { x: '2024-03', y: 1.12 },
      { x: '2024-04', y: 1.18 },
      { x: '2024-05', y: 1.22 },
      { x: '2024-06', y: 1.25 },
    ],
  },
];

// Mock data for the table
const portfolioAssets = [
  { name: 'Apple Inc.', type: 'Stocks', value: 45000, gainLoss: '+12.5%' },
  { name: 'Microsoft Corp.', type: 'Stocks', value: 35000, gainLoss: '+8.2%' },
  { name: 'Vanguard S&P 500', type: 'ETF', value: 25000, gainLoss: '+5.7%' },
  { name: 'Tesla Inc.', type: 'Stocks', value: 15000, gainLoss: '-3.2%' },
  { name: 'Amazon.com Inc.', type: 'Stocks', value: 20000, gainLoss: '+4.8%' },
];

export const InvestmentTracking = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledMetricsContainer>
        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>Total Value</StyledSubHeading>
            <StyledMetricValue>$115,000</StyledMetricValue>
            <StyledMetricDescription>
              Current total portfolio value including all assets
            </StyledMetricDescription>
          </StyledCardContent>
        </StyledCard>

        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>YTD Performance</StyledSubHeading>
            <StyledMetricValue style={{ color: theme.color.green }}>
              +15.0%
            </StyledMetricValue>
            <StyledMetricDescription>
              Year-to-date return on investment
            </StyledMetricDescription>
          </StyledCardContent>
        </StyledCard>

        <StyledCard>
          <StyledCardContent>
            <StyledSubHeading>Risk Profile</StyledSubHeading>
            <StyledMetricValue>Moderate</StyledMetricValue>
            <StyledMetricDescription>
              Balanced risk-reward investment strategy
            </StyledMetricDescription>
          </StyledCardContent>
        </StyledCard>
      </StyledMetricsContainer>

      <StyledChartContainer>
        <ResponsiveLine
          data={portfolioData}
          margin={{ top: 20, right: 37, bottom: 50, left: 50 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Value',
            legendOffset: -40,
            legendPosition: 'middle',
            format: (value) => value.toFixed(2),
          }}
          enableGridX={false}
          colors={[theme.color.blue]}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            const point = slice.points[0];
            const x = point.data.x as string;
            const y = point.data.y as number;
            return (
              <div
                style={{
                  background: theme.background.secondary,
                  padding: theme.spacing(2),
                  border: `1px solid ${theme.border.color.medium}`,
                  borderRadius: theme.border.radius.md,
                  fontFamily: theme.font.family,
                }}
              >
                <div style={{ marginBottom: theme.spacing(1) }}>{x}</div>
                <div>{y.toFixed(2)}x</div>
              </div>
            );
          }}
          animate={false}
          motionConfig="none"
          theme={{
            text: {
              fill: theme.font.color.light,
              fontSize: theme.font.size.sm,
              fontFamily: theme.font.family,
            },
            axis: {
              domain: {
                line: {
                  stroke: theme.border.color.strong,
                },
              },
              ticks: {
                line: {
                  stroke: theme.border.color.strong,
                },
              },
            },
            grid: {
              line: {
                stroke: theme.border.color.medium,
              },
            },
          }}
        />
      </StyledChartContainer>

      <StyledCard>
        <StyledCardContent>
          <StyledHeading>Portfolio Holdings</StyledHeading>
          <Table>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Asset Name</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Value</StyledTableCell>
                <StyledTableCell>Gain/Loss</StyledTableCell>
              </StyledTableRow>
              {portfolioAssets.map((asset, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{asset.name}</StyledTableCell>
                  <StyledTableCell>{asset.type}</StyledTableCell>
                  <StyledTableCell>
                    ${asset.value.toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      color: asset.gainLoss.startsWith('+')
                        ? theme.color.green
                        : theme.color.red,
                    }}
                  >
                    {asset.gainLoss}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledCardContent>
      </StyledCard>
    </StyledContainer>
  );
};
