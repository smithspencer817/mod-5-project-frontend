import React from 'react'
import { Button, Modal, Divider, Header, Segment, Message, Select, Form } from 'semantic-ui-react'

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
          {
            props.question.questioner.username === props.currentUser.username ?
            <Modal.Content>
              <Form onSubmit={(e) => props.handleReviewSubmit(e)}>
                <Form.Field inline>
                  <label>{`Give ${props.question.answerer.name} a review`}</label>
                  <select class="ui dropdown" placeholder={`Rate ${props.question.answerer.name}'s response`} style={{'width': '50px'}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <Button type="submit">Review {props.question.answerer.name}</Button>
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