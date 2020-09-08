import React from 'react'
import { Button, Modal, Divider, Header, Segment, Message, Form, Grid } from 'semantic-ui-react'

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

let [date, minute] = props.question.created_at.split("T")
let [hour, min, second] = minute.slice(0,8).split(':')

hour = parseInt(hour) + 7

if (parseInt(hour) > 12) {
  hour = parseInt(hour) - 12
} else if (parseInt(hour) === 0) {
  hour = 12
}

  return (
    <div className="question-preview">
        <Segment className="question-preview-segment">
            <Header as='h2' floated='left'>
            {props.question.text}
            </Header>

            <Divider clearing />
            
            <strong>{props.question.questioner.username}</strong> <em>asked</em> <strong>{props.question.answerer.username}</strong> <em>@ {hour}:{min}</em>
            <Segment.Group>
            <Segment className="question-preview-answers" onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}>{props.question.answers.length} response(s)</Segment>
            </Segment.Group>
            
        </Segment>
      

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>"{props.question.text}"</Modal.Header>
        <Modal.Content>
          {
            isAnswered ?
            <div>
            <h4>{`${props.question.answerer.name} responded...`}</h4>
            <Message color="green" list={props.question.answers.map(answer => <li>{answer.text}</li>)}></Message>
            </div>
            :
            <Message color="red" header={`${props.question.answerer.name} hasn't responded yet...`}></Message>
          }
        </Modal.Content>
          {
            props.question.questioner.username === props.currentUser.username && isAnswered ?
            <Modal.Content>
              <Form onSubmit={(e) => props.handleReviewSubmit(e, props.question.answerer)}>
                <Form.Field inline>
                  <select class="ui dropdown" placeholder={`Rate ${props.question.answerer.name}'s response`} style={{'width': '50px'}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <Button type="submit" size="mini" basic color="green" >Review {props.question.answerer.name}'s Response</Button>
                </Form.Field>
              </Form>
            </Modal.Content>
            :
            null
          }
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