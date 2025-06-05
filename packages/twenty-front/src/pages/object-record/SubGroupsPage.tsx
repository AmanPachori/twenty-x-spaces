import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { PageTitle } from '@/ui/utilities/page-title/components/PageTitle';
import { useParams } from 'react-router-dom';
import { AssetAllocation } from './components/AssetAllocation';
import { InvestmentTracking } from './components/InvestmentTracking';

export const SubGroupsPage = () => {
  const { viewId } = useParams();
  const title = viewId === 'asset' ? 'Asset Allocation' : 'Investment Tracking';

  return (
    <PageContainer>
      <PageTitle title={title} />
      <PageHeader title={title} />
      {viewId === 'asset' ? <AssetAllocation /> : <InvestmentTracking />}
    </PageContainer>
  );
};
