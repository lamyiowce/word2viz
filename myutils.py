import pandas as pd

def get_with_tsne(df, words, a, b):
    axis = df.loc[b] - df.loc[a]
    df_words = df.loc[words]
    df_words_rest = df_words - pd.DataFrame(np.outer(df_words.dot(axis), axis), index=df_words.index, columns=df_words.columns)
    model = TSNE(n_components=1, random_state=0, perplexity=100)
    df_words_tsne = pd.DataFrame(model.fit_transform(df_words_rest), index=words).rename(columns={0:"tsne"})
    df_words_tsne["name"]=words
    df_words_tsne["axis"] = df_words.dot(axis)
    return df_words_tsne

def get_with_axes(df, words, a, b):
    proj = pd.DataFrame([a, b], index=["a", "b"]).transpose()
    df_plot = df.loc[words].dot(proj)
    df_plot["name"] = df_plot.index
    return df_plot

def similar(dft, word, n = 10):
    return dft.dot(word).sort_values(ascending=False).head(n)

def least_similar(dft, word, n = 10):
    return dft.dot(word).sort_values().head(n)