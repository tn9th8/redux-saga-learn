import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalDeleteUser = ({ userId, onCancel, onConfirm }) => {
  // console.log('go ModalDeleteUser')
  
  // const [show, setShow] = useState(false);
  // if (state) {
  //   console.log('state', state);
  //   setShow(true);
  // }
  
  // console.log(show)

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <div>
      <Modal isOpen={ !!userId } >
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure to delete the user (id: demo) ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onCancel({ userId: '', confirm: '' })}>
            Cancel
          </Button>{' '}
          <Button color="danger" onClick={() => onConfirm({ userId, confirm: true })}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalDeleteUser;