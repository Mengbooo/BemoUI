import { CliTab, CodeTab, PreviewTab, TabbedLayout } from '../../../components/common/TabbedLayout';
import CliInstallation from '../../../components/code/CliInstallation';

const TabsLayout = ({ children, className }) => (
  <TabbedLayout className={className}>
    {children}
    <CliTab><CliInstallation /></CliTab>
  </TabbedLayout>
);

export { CodeTab, PreviewTab, TabsLayout };
