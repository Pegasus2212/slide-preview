import React, { useState, useRef, useEffect } from "react";
import Konva from "konva";
import { Flex, Box, Button } from "rebass";
import { Stage, Layer, Image, Text } from "react-konva";

function App() {
  const newjson =
    ' [{"attrs":{"width":764,"height":430,"id":"1"},"className":"Stage",\
  "children":[{"attrs":{},"className":"Layer","children":[]}]},{"attrs":{"width":764,\
  "height":430,"id":"1"},"className":"Stage","children":[{"attrs":{},"className":"Layer"\
  ,"children":[{"attrs":{"id":"canvastext","text":"Unshod horses heading south.","fontSize":32,\
  "fontFamily":"Baloo Da 2","x":290,"y":180,"align":"center","verticalAlign":"middle","height":40,\
  "width":600,"fill":"black","draggable":true},"className":"Text"}]}]},{"attrs":{"width":764,"height":430,\
  "id":"1"},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":\
  [{"attrs":{"id":"canvastext","text":"Unshod horses heading south.","fontSize":32,\
  "fontFamily":"Baloo Da 2","x":290,"y":180,"align":"center","verticalAlign":"middle",\
  "height":40,"width":600,"fill":"black","draggable":true},"className":"Text"},{"attrs":\
  {"id":"canvastext","text":"The horse stumbled, and his rider was thrown heavily to the ground."\
  ,"fontSize":24,"x":290,"y":180,"align":"center","verticalAlign":"middle","height":100,"width":300\
  ,"fill":"black","fontFamily":"Baloo Da 2","draggable":true},"className":"Text"}]}]},{"attrs"\
  :{"width":764,"height":430,"id":"1"},"className":"Stage","children":[{"attrs":{},"className":\
  "Layer","children":[{"attrs":{"id":"canvastext","text":"Unshod horses heading south.","fontSize":32\
  ,"fontFamily":"Baloo Da 2","x":290,"y":180,"align":"center","verticalAlign":"middle","height"\
  :40,"width":600,"fill":"black","draggable":true},"className":"Text"},{"attrs":{"id":"canvastext\
  ","text":"The horse stumbled, and his rider was thrown heavily to the ground.","fontSize":24,"x\
  ":290,"y":180,"align":"center","verticalAlign":"middle","height":100,"width":300,"fill":"black"\
  ,"fontFamily":"Baloo Da 2","draggable":true},"className":"Text"},{"attrs":{"id":"canvastext","\
  text":"His horse, having galloped up to a campfire that was smolderingin the morning light, \
  stopped suddenly, and Petya fell heavily on to the wet ground.","fontSize":16,"x":290,"y":180,\
  "align":"center","verticalAlign":"middle","height":100,"width":280,"fill":"black","fontFamily":\
  "Baloo Da 2","draggable":true},"className":"Text"}]}]},{"attrs":{"width":764,"height":430,"id":"1"}\
  ,"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"id":"canvastext\
  ","text":"Unshod horses heading south.","fontSize":32,"fontFamily":"Baloo Da 2","x":290,"y":180,\
  "align":"center","verticalAlign":"middle","height":40,"width":600,"fill":"black","draggable":true}\
  ,"className":"Text"},{"attrs":{"id":"canvastext","text":"The horse stumbled, and his rider was \
  thrown heavily to the ground.","fontSize":24,"x":290,"y":180,"align":"center","verticalAlign":\
  "middle","height":100,"width":300,"fill":"black","fontFamily":"Baloo Da 2","draggable":true},\
  "className":"Text"},{"attrs":{"id":"canvastext","text":"His horse, having galloped up to a ca\
  mpfire that was smolderingin the morning light, stopped \
  suddenly, and Petya fell heavily on to the wet ground.","fontSize":16,"x":290,"y":180,"align":\
  "center","verticalAlign":"middle","height":100,"width":280,"fill":"black","fontFamily":"Baloo \
  Da 2","draggable":true},"className":"Text"},{"attrs":{"id":"canvastext","text":"The horse stu\
  mbled, and his rider was thrown heavily to the ground.","fontSize":24,"x":290,"y":180,"align"\
  :"center","verticalAlign":"middle","height":100,"width":300,"fill":"black","fontFamily":"Balo\
  o Da 2","draggable":true},"className":"Text"}]}]}]';
  const newJson = JSON.parse(newjson);
  console.log("newJson", newJson);

  const json =
    '{"attrs":{"width":764,"height":430,"id":"1"},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[]}]}';
  const defaultJson = JSON.parse(json);
  console.log("defaultJSON", defaultJson);

  const [preview, setPreview] = useState(newJson)
  console.log("preview", preview)
  // console.log("previewstringify: ", JSON.stringify(preview))

  const [onCanvas, setOncanvas] = useState(preview[0])
  console.log("onCanvas", onCanvas)

  const [index, setIndex] = useState()
  console.log("index", index)
  
  useEffect(()=>{
    stageRef.current.on("dragmove", ()=>{
      let newslide = JSON.parse(stageRef.current.toJSON())
      // console.log(newslide)
      let newarr = [...preview]
      newarr[index] = newslide
      setPreview(newarr)
      // console.log("newarr", newarr)
      // console.log(setPreview((arr)=>[...arr, defaultJson]))
    })
    
  })

  const stageRef = useRef();
  return (
    <Box  width="100%" height="100vh">
      <Box sx={{textAlign: "center"}}  height="10%" width="100vw">
        <Button
          onClick={() => console.log(JSON.stringify(preview))}
          sx={{backgroundColor: "black", color: "white", cursor: "pointer" }} // on submit you can console the json of all the stages together
        >
          Submit  
        </Button> 
        <Button
          onClick={() =>{setPreview((arr) => [...arr, defaultJson])}}
          sx={{backgroundColor: "black", color: "white", cursor: "pointer" }}
        >
          Add Slide
        </Button>
      </Box>
      <Flex height="70%" sx={{ backgroundColor: "black" }}>
        <Stage
          ref={stageRef}
          style={{margin: "auto", backgroundColor: "white" }}
          width={onCanvas.attrs.width}
          height={onCanvas.attrs.height}
          scale={{ x: 1, y: 1 }}
        >
          {onCanvas.children.map((layer) => {
            return (
              <>
                <Layer>
                  {layer.children.map((element) => {
                    const elemprop = element.attrs
                    return element.className === "Text" ? (
                      <Text
                        draggable
                        text={elemprop.text}
                        align={elemprop.align}
                        fontSize={elemprop.fontSize}
                        fill={elemprop.fill}
                        x={elemprop.x}
                        y={elemprop.y}
                        height={elemprop.height}
                        width={elemprop.width}
                      />
                    ) : null;
                  })}
                </Layer>
              </>
            );
          })}
        </Stage>
      </Flex>
      <Flex height="20%" sx={{whiteSpace: "nowrap", overflowX: "auto", margin: "auto", backgroundColor: "black" }}>
        {preview.map((json, i) => {
          return (
            <Stage
              onClick={() => {setIndex(i);setOncanvas(preview[i])}}
              style={{margin: "auto 15px", backgroundColor: "white" }}
              listening={false}
              width={json.attrs.width / 4}
              height={json.attrs.height / 4}
              scale={{ x: 1 / 4, y: 1 / 4 }}
            >
              {json.children.map((layer) => {
                return (
                  <Layer>
                    {layer.children.map((element) => {
                      return element.className === "Text" ? (
                        <Text
                          text={element.attrs.text}
                          align={element.attrs.align}
                          fontSize={element.attrs.fontSize}
                          fill={element.attrs.fill}
                          x={element.attrs.x}
                          y={element.attrs.y}
                          height={element.attrs.height}
                          width={element.attrs.width}
                        />
                      ) : null;
                    })}
                  </Layer>
                );
              })}
            </Stage>
          );
        })}
      </Flex>
    </Box>
  );
}

export default App;
