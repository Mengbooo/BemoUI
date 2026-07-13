import { Badge, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import CliInstallation from "../../components/code/CliInstallation";
import CodeExample from "../../components/code/CodeExample";
import PropTable from "../../components/common/PropTable";
import Marquee from "../../content/Components/Marquee/Marquee";
import { marquee } from "../../constants/code/Components/marqueeCode";

const brands = [
  { name: "Northstar", category: "Analytics", color: "#1620E4", textColor: "#ffffff" },
  { name: "Relay", category: "Automation", color: "#7BE9C6", textColor: "#050505" },
  { name: "Canvas", category: "Design", color: "#1620E4", textColor: "#ffffff" },
  { name: "Orbit", category: "Infrastructure", color: "#7BE9C6", textColor: "#050505" },
  { name: "Layer", category: "Collaboration", color: "#1620E4", textColor: "#ffffff" },
  { name: "Signal", category: "Intelligence", color: "#7BE9C6", textColor: "#050505" },
];

const reviews = [
  { quote: "The page feels premium without sacrificing load time.", name: "Maya Chen", role: "Product Lead" },
  { quote: "We shipped the launch site in days, not another sprint.", name: "Jon Bell", role: "Founder" },
  { quote: "Polished motion with an API our team could actually reuse.", name: "Ari Kim", role: "Design Engineer" },
  { quote: "The responsive behavior held up across every breakpoint.", name: "Lena Ortiz", role: "Creative Director" },
];

const BrandCard = ({ name, category, color, textColor }) => (
  <Flex
    as="article"
    align="center"
    gap={3}
    minW={{ base: "220px", md: "260px" }}
    px={5}
    py={4}
    border="1px solid rgba(255,255,255,.1)"
    borderRadius="18px"
    bg="rgba(255,255,255,.045)"
    boxShadow="0 16px 40px rgba(0,0,0,.22)"
    backdropFilter="blur(14px)"
  >
    <Flex
      align="center"
      justify="center"
      boxSize="42px"
      flexShrink={0}
      borderRadius="13px"
      color={textColor}
      bg={color}
      fontWeight="900"
      fontSize="18px"
    >
      {name[0]}
    </Flex>
    <Box>
      <Text color="white" fontWeight="700" letterSpacing="-.02em">{name}</Text>
      <Text color="whiteAlpha.500" fontSize="12px">{category}</Text>
    </Box>
    <Icon as={FiArrowUpRight} color="whiteAlpha.400" ml="auto" />
  </Flex>
);

const ReviewCard = ({ quote, name, role }) => (
  <Box
    as="article"
    minW={{ base: "280px", md: "350px" }}
    p={5}
    border="1px solid rgba(255,255,255,.1)"
    borderRadius="20px"
    bg="linear-gradient(145deg, rgba(255,255,255,.07), rgba(255,255,255,.025))"
  >
    <Flex gap={1} mb={4} color="#7BE9C6">
      {Array.from({ length: 5 }, (_, index) => <Icon as={FiStar} fill="currentColor" key={index} />)}
    </Flex>
    <Text color="whiteAlpha.900" fontSize="15px" lineHeight="1.7">“{quote}”</Text>
    <Flex mt={5} align="center" gap={3}>
      <Flex align="center" justify="center" boxSize="34px" borderRadius="full" bg="whiteAlpha.200" fontWeight="700">
        {name[0]}
      </Flex>
      <Box>
        <Text color="white" fontSize="13px" fontWeight="700">{name}</Text>
        <Text color="whiteAlpha.500" fontSize="11px">{role}</Text>
      </Box>
    </Flex>
  </Box>
);

const MarqueeDemo = () => {
  const propData = [
    { name: "reverse", type: "boolean", default: "false", description: "Reverses the animation direction." },
    { name: "pauseOnHover", type: "boolean", default: "false", description: "Pauses on pointer hover or keyboard focus." },
    { name: "vertical", type: "boolean", default: "false", description: "Scrolls content vertically." },
    { name: "repeat", type: "number", default: "4", description: "Number of repeated tracks; values below 2 are clamped." },
    { name: "duration", type: "string", default: "40s", description: "Controls the duration of one animation cycle." },
    { name: "gap", type: "string", default: "1rem", description: "Controls spacing between items and repeated tracks." },
    { name: "fade", type: "boolean", default: "false", description: "Adds a directional fade mask at both edges." },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          className="demo-container"
          overflow="hidden"
          py={{ base: 10, md: 14 }}
          bg="radial-gradient(circle at 50% 0%, rgba(22,32,228,.24), transparent 38%), #050505"
        >
          <Box textAlign="center" maxW="680px" mx="auto" px={5} mb={8}>
            <Badge px={3} py={1} borderRadius="full" bg="whiteAlpha.100" color="whiteAlpha.700" fontWeight="600">
              BUILT FOR LANDING PAGES
            </Badge>
            <Text mt={4} color="white" fontSize={{ base: "28px", md: "40px" }} fontWeight="800" letterSpacing="-.045em">
              Trusted by teams that ship
            </Text>
            <Text mt={3} color="whiteAlpha.600" fontSize={{ base: "14px", md: "16px" }}>
              A reusable, responsive strip for customer logos, testimonials, media mentions, or product screenshots.
            </Text>
          </Box>

          <Marquee aria-label="Demo company list" pauseOnHover fade duration="26s" gap="14px">
            {brands.map((brand) => <BrandCard {...brand} key={brand.name} />)}
          </Marquee>

          <Box mt={4}>
            <Marquee aria-label="Demo testimonial list" reverse pauseOnHover fade duration="34s" gap="14px">
              {reviews.map((review) => <ReviewCard {...review} key={review.name} />)}
            </Marquee>
          </Box>
        </Box>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={marquee} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...marquee} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MarqueeDemo;
