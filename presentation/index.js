// Import React
import React from "react"

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  Deck,
  Heading,
  Image,
  Link,
  ListItem,
  List,
  Magic,
  Notes,
  Quote,
  Slide,
  SlideSet,
  Text,
} from "spectacle"

import Terminal from "spectacle-terminal"
import CodeSlide from "spectacle-code-slide"
import CodeSurfer from "code-surfer"

// Import theme
import createTheme from "spectacle/lib/themes/default"

import "prismjs"

// Require CSS
require("normalize.css")

const theme = createTheme(
  {
    primary: "white",
    secondary: "#1F2022",
    tertiary: "#03A9FC",
    quaternary: "#CECECE",
  },
  {
    primary: "Montserrat",
    secondary: "Helvetica",
  }
)

/* eslint import/no-webpack-loader-syntax: off */

export default class Presentation extends React.Component {
  constructor(props) {
    super(props)
    this.deck = React.createRef()
  }

  render() {
    return (
      <Deck
        // transition={["zoom", "slide"]}
        // transition={["zoom"]}
        transition={["fade"]}
        transitionDuration={500}
        theme={theme}
        // progress="pacman"
        progress="bar"
        // progress="none"
        // progress="number"
        showFullscreenControl={false}
        contentHeight="1080px"
        contentWidth="1600px"
        ref={this.deck}
      >
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Custom Sudoku Books
            <br />
            with Ruby!! and LaTeX!!
          </Heading>
          <Text margin="40px 0 0" textColor="tertiary" size={1} fit bold>
            Geoffrey Lessel &mdash; @geolessel
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="tertiary">
          <Text textColor="primary" fit>
            Half the fun of programming is
          </Text>
          <Text textColor="primary" fit caps bold>
            figuring stuff out
          </Text>
        </Slide>

        <Slide bgColor="primary" transitionOut={["fade"]}>
          <Image src={require("../assets/sudoku-may-11.png")} height="1000px" />
        </Slide>

        <Slide bgColor="secondary">
          <Notes>
            <div>Full House</div>
            <div>Naked Single</div>
            <div>Locked Triple</div>
            <div>Hidden Quad</div>
            <div>X-Wing</div>
            <div>Squirmbag</div>
            <div>Swordfish</div>
            <div>2-String Kite</div>
            <div>Exocet</div>
            <div>Nishio Forcing Chains</div>
          </Notes>
          <Heading size={1} fit textColor="tertiary">
            Solving Strategies
          </Heading>
          <Text textAlign="center" textColor="primary">
            <div>Full House</div>
            <div>Naked Single</div>
            <div>Locked Triple</div>
            <div>Hidden Quad</div>
            <div>X-Wing</div>
            <div>Squirmbag</div>
            <div>Swordfish</div>
            <div>2-String Kite</div>
            <div>Exocet</div>
            <div>Nishio Forcing Chains</div>
          </Text>
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={2} fit textColor="tertiary">
            Now I just have to figure out how to
          </Heading>
          <Heading size={2} fit caps textColor="tertiary">
            generate puzzles
          </Heading>
        </Slide>

        <Slide>
          <Heading size={1}>sudoku</Heading>
          <Text>by Glenn Fowler</Text>
          <Notes>9000+ word man/help file</Notes>
        </Slide>

        <Slide bgColor="tertiary">
          <Notes>
            <div>
              <code>-m</code> - minimal; any further removals mean multiple
              solutions
            </div>
            <div>
              <code>-sg</code> - rotate symmetry
              <br />
              <ul>
                <li>full dihedral</li>
                <li>full rotational</li>
                <li>horizontal and vertical</li>
                <li>diagonal and antidiagonal</li>
                <li>pi rotational</li>
              </ul>
            </div>
            <div>
              <code>-q</code> - limit constraints
            </div>
            <div>
              <p>
                Second puzzle:
                <br />
                Naked single, hidden single, box claim, hidden tuple, singles
                knot (bivalue/location contradiction chains)
              </p>
              <p>25 given clues; minimal</p>
              <p>Symmetry: vertical</p>
            </div>
          </Notes>
          <Heading size={1} caps textColor="secondary">
            sudoku usage
          </Heading>
          <Text textColor="primary">
            Generate 100 minimal symmetric puzzles limited to pairs and x-wings
          </Text>
          <Image src={require("../assets/sudoku-usage.png")} width="1500px" />
          {/* <Terminal */}
          {/*   title="geo@beringer" */}
          {/*   output={[ */}
          {/*     <div style={{ color: "grey" }}> */}
          {/*       # Generate 100 minimal symmetric puzzles limited to pairs and */}
          {/*       x-wings */}
          {/*     </div>, */}
          {/*     "> sudoku -g                     \\", */}
          {/*     ">        -n100                  \\", */}
          {/*     ">        -m                     \\", */}
          {/*     ">        -sg                    \\", */}
          {/*     ">        -q+T2H2W2-XYG          \\", */}
          {/*     '>        -e "valid&&minimal==1"', */}
          {/*     "4...3.....2.7..5...7....36.2.5........18....939..2..7.....76......3..49....4.5..8 # 96772 FNBHK C25.m/S2.a", */}
          {/*   ]} */}
          {/* /> */}
        </Slide>

        <Slide>
          <Heading size={1} caps fit>
            The Process
          </Heading>
          <AppearingText>
            Generate tens of thousands of puzzles into a text file
          </AppearingText>
          <AppearingText>
            Parse and categorize the puzzles and insert into MySQL with a Ruby
            script
          </AppearingText>
          <AppearingText>
            With another Ruby script, fetch the puzzles and generate LaTeX
          </AppearingText>
          <AppearingText>
            Use LaTeX to generate a PDF that can be printed and bound
          </AppearingText>
          <AppearingText>Use Paul Abraham's LaTeX sudoku package</AppearingText>
        </Slide>

        <CodeSlide
          transition={[]}
          lang="ruby"
          code={require("!raw-loader!./generate_book.rb")}
          title="generate_book.rb"
          ranges={[
            { loc: [14, 15] },
            { loc: [15, 36] },
            { loc: [72, 81] },
            { loc: [84, 103] },
            { loc: [105, 115] },
            { loc: [118, 140] },
          ]}
        />

        <CodeSlide
          transition={[]}
          lang="latex"
          code={require("!raw-loader!./book.tex")}
          ranges={[
            { loc: [0, 2] },
            { loc: [20, 38] },
            { loc: [21, 32] },
            { loc: [34, 35] },
            { loc: [57, 66] },
            { loc: [66, 79] },
          ]}
        />

        <Slide bgColor="primary" transitionOut={["fade"]}>
          <Image src={require("../assets/sudoku-may-11.png")} height="1000px" />
        </Slide>

        <Slide bgColor="primary" transitionOut={["fade"]}>
          <Image
            src={require("../assets/sudoku-may-11-solution.png")}
            height="1000px"
          />
        </Slide>

        <Slide bgColor="secondary" transitionOut={["fade"]}>
          <Image
            fill
            src={require("../assets/book-outside.png")}
            height="1000px"
          />
        </Slide>

        <Slide bgColor="secondary" transitionOut={["fade"]}>
          <Image
            fill
            src={require("../assets/book-inside.png")}
            height="1000px"
          />
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={1} textColor="tertiary" fit caps>
            Phoenix in Action
          </Heading>
          <Image src={require("../assets/pia.png")} height="700px" />
          <Link href="http://phoenixinaction.com">
            <Text textColor="primary">phoenixinaction.com</Text>
            <Text textColor="primary">
              40% discount: <Code textColor="primary">ctwbangbang19</Code>
            </Text>
          </Link>
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={1} fit caps textColor="tertiary">
            Thank You
          </Heading>
          <AppearingText>
            <Heading size={2} textColor="primary">
              Geoffrey Lessel
            </Heading>
          </AppearingText>
          <AppearingText>
            <Heading size={2} textColor="primary">
              @geolessel
            </Heading>
          </AppearingText>
          <AppearingText>
            <Heading size={3} textColor="primary">
              geoffreylessel.com/bang-bang-con
            </Heading>
          </AppearingText>
        </Slide>
      </Deck>
    )
  }
}

const AppearingText = ({ children }) => (
  <Appear>
    <div style={{ marginBottom: "20px" }}>{children}</div>
  </Appear>
)
