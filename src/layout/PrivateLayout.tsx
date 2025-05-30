import { Box, useBreakpointValue } from '@chakra-ui/react';
import Sidenavbar from '@/components/Sidenavbar/Sidenavbar';
import useAutocloseSidenavbar from '@/hooks/useAutocloseSidenavbar';
import OverlayToLayout from '@/components/ui/OverlayToLayout';
import { useTopbarTitle } from '@/hooks/useTopbarTitle';
import MainContainer from '@/components/PrivateLayoutComponents/MainContainer';
import { useFetchProfile } from '@/hooks/useProfile';
import { useFetchProducts } from '@/hooks/useProduct';
import { useDailyReport, useTodayResume, useTopBestSellings } from '@/hooks/useReport';
// import { ColorModeButton } from '@/components/ui/color-mode';

const PrivateLayout = () => {

  const isMobile = useBreakpointValue({ base: true, md: false });
  useAutocloseSidenavbar();
  useTopbarTitle();
  useFetchProfile();
  useFetchProducts();
  useTopBestSellings();
  useTodayResume();
  useDailyReport(new Date());

  return (
    <Box
      display={"flex"}
      position={"relative"}>
      {/* <ColorModeButton pos={"fixed"} bottom={"10px"} left={"10px"} zIndex={1000} border={"md"} borderColor={{ base: "black", _dark: "white" }} /> */}
      <Sidenavbar />
      <MainContainer />
      {isMobile && <OverlayToLayout />}
    </Box>
  );
};

export default PrivateLayout;