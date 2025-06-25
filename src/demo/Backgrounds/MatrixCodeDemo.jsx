import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/PropTable";

import MatrixCode from "../../content/Backgrounds/MatrixCode/MatrixCode";
import { matrixCode } from "../../constants/code/Backgrounds/matrixCodeCode";

const MatrixCodeDemo = () => {
  const [fontSize, setFontSize] = useState(20);
  const [color, setColor] = useState("#00ff00");
  const [characters, setCharacters] = useState("01");
  const [fadeOpacity, setFadeOpacity] = useState(0.1);
  const [speed, setSpeed] = useState(1);

  const propData = [
    {
      name: "fontSize",
      type: "number",
      default: "20",
      description: "The font size of the matrix code characters."
    },
    {
      name: "color",
      type: "string",
      default: "#00ff00",
      description: "The color of the matrix code characters."
    },
    {
      name: "characters",
      type: "string",
      default: "01",
      description: "The characters used in the matrix code effect."
    },
    {
      name: "fadeOpacity",
      type: "number",
      default: "0.1",
      description: "The opacity of the fade effect for the matrix code."
    },
    {
      name: "speed",
      type: "number",
      default: "1",
      description: "The speed of the matrix code animation."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <MatrixCode
            fontSize={fontSize}
            color={color}
            characters={characters}
            fadeOpacity={fadeOpacity}
            speed={speed}
          />
        </Box>

        <div className="preview-options">
          <h2 className="demo-title-extra">Customize</h2>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Font Size</Text>
            <Slider
              min={10}
              max={50}
              step={5}
              value={fontSize}
              onChange={(val) => {
                setFontSize(val);
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{fontSize}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); }}
              width="50px"
            />
            <Text fontSize="sm">{color}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Characters</Text>
            <Input
              type="text"
              value={characters}
              onChange={(e) => { setCharacters(e.target.value); }}
              width="200px"
            />
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Fade Opacity</Text>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={fadeOpacity}
              onChange={(val) => {
                setFadeOpacity(val);
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{fadeOpacity}</Text>
          </Flex>

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Speed</Text>
            <Slider
              min={0.5}
              max={5}
              step={0.5}
              value={speed}
              onChange={(val) => {
                setSpeed(val);
              }}
              width="200px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text fontSize="sm">{speed}</Text>
          </Flex>
        </div>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={matrixCode} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...matrixCode} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MatrixCodeDemo;





