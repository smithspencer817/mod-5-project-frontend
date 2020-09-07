import React from 'react'
import { Button, Modal, Divider, Header, Segment, Message } from 'semantic-ui-react'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function QuestionPreview(props) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
const { open, dimmer } = state

const isAnswered = props.question.answers.length !== 0

  return (
    <div className="question-preview">
        <Segment>
            <Header as='h2' floated='right'>
            {props.question.text}
            </Header>

            <Divider clearing />
            
                <strong>{props.question.questioner.username}</strong> asked {props.question.answerer.username}
                <Segment.Group>
                <Segment onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}>{props.question.answers.length} response(s)</Segment>
                </Segment.Group>
            
        </Segment>
      

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>{props.question.questioner.name} asked... "{props.question.text}"</Modal.Header>
        <Modal.Content>
          {
            isAnswered ?
            <Message color="green" header={`${props.question.answerer.name} responded...`} list={props.question.answers.map(answer => <li>{answer.text}</li>)}></Message>
            :
            <Message color="red" header={`${props.question.answerer.name} hasn't responded yet...`}></Message>
          }
        </Modal.Content>
        <Modal.Actions>
          {
            isAnswered ?
            <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              That's Cool
            </Button>
            :
            <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
              That's Lame
            </Button>
          }
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default QuestionPreview