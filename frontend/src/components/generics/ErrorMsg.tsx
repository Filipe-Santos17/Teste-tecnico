export default function ErroMsg({ erro }: { erro: string | boolean }) {
    if (!erro) return null;
    return <p className="font-medium text-xs leading-4 text-red mx-0 my-1">{erro}</p>;
  }