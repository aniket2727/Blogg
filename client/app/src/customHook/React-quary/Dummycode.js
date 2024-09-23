



import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteCommentByIds } from './DeletecommentUsingid';
const MyComponent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(DeleteCommentByIds, {
    onSuccess: (data) => {
      console.log("Comment deleted successfully", data);
      // Invalidate or refetch comments data
      queryClient.invalidateQueries(['comments']);
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const handleDelete = (postid, commentid) => {
    mutation.mutate({ postid, commentid });
  };

  return (
    <div>
      <button onClick={() => handleDelete('post123', 'comment456')}>
        Delete Comment
      </button>
      {mutation.isLoading && <p>Deleting comment...</p>}
      {mutation.isError && <p>Error occurred!</p>}
      {mutation.isSuccess && <p>Comment deleted!</p>}
    </div>
  );
};

export default MyComponent;
