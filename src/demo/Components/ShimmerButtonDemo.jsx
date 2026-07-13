import { Badge, Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiCheck, FiZap } from "react-icons/fi";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import CliInstallation from "../../components/code/CliInstallation";
import CodeExample from "../../components/code/CodeExample";
import PropTable from "../../components/common/PropTable";
import ShimmerButton from "../../content/Components/ShimmerButton/ShimmerButton";
import { shimmerButton } from "../../constants/code/Components/shimmerButtonCode";

const ShimmerButtonDemo = () => {
  const propData = [
    { name: "shimmerColor", type: "string", default: '"#7BE9C6"', description: "Color of the animated edge shimmer." },
    { name: "shimmerSize", type: "string", default: '"0.05em"', description: "Width of the visible shimmer cutout around the button." },
    { name: "shimmerDuration", type: "string", default: '"3s"', description: "Duration of one shimmer pass." },
    { name: "borderRadius", type: "string", default: '"100px"', description: "Button and inner backdrop border radius." },
    { name: "background", type: "string", default: '"rgba(0, 0, 0, 1)"', description: "Background used by the button and inner backdrop." },
    { name: "children", type: "ReactNode", default: "—", description: "CTA label or custom inline content." },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          className="demo-container"
          overflow="hidden"
          minH={{ base: "430px", md: "480px" }}
          px={{ base: 6, md: 12 }}
          py={{ base: 10, md: 14 }}
          bg="radial-gradient(circle at 50% 15%, rgba(22,32,228,.22), transparent 34%), linear-gradient(145deg, #09090b, #030305)"
        >
          <Flex direction="column" align="center" justify="center" minH={{ base: "350px", md: "390px" }} textAlign="center">
            <Badge px={3} py={1} borderRadius="full" bg="rgba(22,32,228,.18)" color="#7BE9C6" letterSpacing=".08em">
              <Flex align="center" gap={2}><Icon as={FiZap} /> LAUNCH READY</Flex>
            </Badge>

            <Text mt={6} maxW="760px" color="white" fontSize={{ base: "34px", md: "58px" }} fontWeight="850" lineHeight="1.03" letterSpacing="-.055em">
              Turn attention into action.
            </Text>
            <Text mt={5} maxW="580px" color="whiteAlpha.600" fontSize={{ base: "15px", md: "17px" }} lineHeight="1.75">
              A polished CTA button with a configurable shimmer edge, native button semantics, keyboard focus, and reduced-motion support.
            </Text>

            <Flex mt={8} gap={3} wrap="wrap" justify="center">
              <ShimmerButton shimmerColor="#7BE9C6" background="rgba(5, 5, 8, 1)">
                Start building <Icon as={FiArrowUpRight} />
              </ShimmerButton>
              <ShimmerButton shimmerColor="#1620E4" background="rgba(5, 5, 8, 1)" borderRadius="14px">
                <Icon as={FiCheck} /> View production demo
              </ShimmerButton>
            </Flex>

            <Text mt={8} color="whiteAlpha.400" fontSize="12px">
              Adapted from{" "}
              <Link href="https://magicui.design/docs/components/shimmer-button" isExternal color="whiteAlpha.700" textDecoration="underline">
                Magic UI Shimmer Button
              </Link>{" "}
              · MIT License
            </Text>
          </Flex>
        </Box>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={shimmerButton} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...shimmerButton} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ShimmerButtonDemo;
