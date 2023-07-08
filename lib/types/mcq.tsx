import { Card, Radio, Button, Text } from "@nextui-org/react";
import { useState } from "react";

export type MCQ = {
    Question: string;
    CorrectOption: string;
    IncorrectOptions: string[];
    FeedbackOnIncorrect: string;
}

function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function getMultipleChoice( data: Object ) {
    let content = data as MCQ
    const [value, setValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const handleSubmit = () => {
        setShowFooter(true);
        setShowResults(value != content.CorrectOption)
    }

    let options = [...content.IncorrectOptions, content.CorrectOption]
    console.log(options)

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Header>
                    <Text b>{content.Question}</Text>
                </Card.Header>
                <Radio.Group 
                    label="Options"
                    onChange={setValue}
                    // validationState={value === content.CorrectOption ? 'valid' : 'invalid'}
                    >
                    {options.map((option) => (
                        <Radio
                            value={option}
                            key={option}
                        >{option}</Radio>
                    ))}
                    <br />
                    <Button variant="primary" type="button" onPress={handleSubmit}>
                        Submit
                    </Button>
                </Radio.Group>
                {
                    showFooter? (
                        showResults ? (
                            <Card.Footer>
                                <Text b>{content.FeedbackOnIncorrect}</Text>
                            </Card.Footer>
                        ) : (
                            <Card.Footer>
                                <Text b>You got it! </Text>
                            </Card.Footer>
                        )
                    ) : null

                }
            </Card.Body>
        </Card>
    )
}